import * as _ from "underscore";
import {
	Penilaian,
	SubCriteria,
	Criteria,
	Candidate,
	TabelBobotGap
} from 'db';

export type PembobotanTable = {
	namaCriteria: string
	table: {
		namaSub: string,
		type: string,
		listCandidate: {
			namaCandidate: string,
			bobotValue: number,
			value: number
		}[],
	}[]
}

export type AvgTotalCriteria = {
	namaCriteria: string,
	listCandidate: {
		nama: string,
		coreFactor: number,
		secondFactor: number,
		coreFactorDesc: number[],
		secondFactorDesc: number[],
		nilaiTotal: number
	}[]
}

export type RankingType = {
	nameCandidate: string,
	value: number
}

export type ProfileMatchType = {
	pembobotanTable: PembobotanTable[],
	avgTotalCriteria: AvgTotalCriteria[],
	ranking: RankingType[]
}

export type PenilaianInput = (Penilaian & {
	subCiteria: SubCriteria,
	candidate: Candidate
})[]

export type CriteriaInput = ( Criteria & {
		subCriteria: ( SubCriteria & {
			penilaian: ( Penilaian & {
				candidate: Candidate 
			})[]
		})[]
	})[]

export const ProfileMatchingExec = (penilaian: PenilaianInput = [], criteria: CriteriaInput = [],tableBobot: TabelBobotGap[] = []): ProfileMatchType => {

	let result: ProfileMatchType = {
		pembobotanTable: [],
		avgTotalCriteria: [],
		ranking:[]
	}

	if(!(penilaian.length && criteria.length && tableBobot.length)) return result; 

	//mapping
	criteria.map(criteriaData => {
		let pembobotanTable: PembobotanTable = {
			namaCriteria: criteriaData.nama,
			table: []
		}
		criteriaData.subCriteria.map(subData => {
			let table: PembobotanTable["table"][0] = {
				namaSub: subData.nama,
				type: subData.type,
				listCandidate: []
			}
			subData.penilaian.map(cData => {
				let value = 0;
				let nilaiTarget = 0;
				if(cData.nilai != null) value = cData.nilai
				if(subData.nilaiTarget != null) nilaiTarget = subData.nilaiTarget
				table.listCandidate.push({
					namaCandidate: cData.candidate.nama,
					value: value - nilaiTarget,
					bobotValue: 0
				})
			})
			table.listCandidate.map(data => {
				const result = _.default.find(tableBobot, { selisih : data!.value })
				data.bobotValue = result!.bobtNilia
			})
			pembobotanTable.table.push(table);
		})
		result.pembobotanTable.push(pembobotanTable);
	})

	//avg total criteria
	result.pembobotanTable.map(datCriteria => {
		let avgTotalCriteria: AvgTotalCriteria = {
			namaCriteria: datCriteria.namaCriteria,
			listCandidate: []
		}
		
		const groupByType = _.groupBy(datCriteria.table, 'type')

		// extract 
		_.forEach(groupByType,function(subCiteria, key) {
			subCiteria.map(subCriteriaDat => {
				subCriteriaDat.listCandidate.map(listCandidateDat => {
					const exiestDat = _.find(avgTotalCriteria.listCandidate, { 'nama': listCandidateDat.namaCandidate });
					if(!exiestDat){
						if(key == 'SECOND_FACTOR'){
							avgTotalCriteria.listCandidate.push({ 
								nama: listCandidateDat.namaCandidate, 
								secondFactorDesc: [listCandidateDat.bobotValue], 
								nilaiTotal: 0, 
								coreFactorDesc: [], 
								coreFactor:0,
								secondFactor: 0
							})	
						}else{
							avgTotalCriteria.listCandidate.push({ 
								nama: listCandidateDat.namaCandidate, 
								secondFactorDesc: [], 
								nilaiTotal: 0, 
								coreFactorDesc: [listCandidateDat.bobotValue], 
								coreFactor:0,
								secondFactor: 0
							})
						}
					}else{
						if(key == 'SECOND_FACTOR'){
							avgTotalCriteria.listCandidate.map(data => {
								if(data.nama == exiestDat.nama){
									data.secondFactorDesc.push(listCandidateDat.bobotValue)
									data.secondFactor = data.secondFactorDesc.reduce((x, y) =>x+y) / data.secondFactorDesc.length
									const valCriteria = _.find(criteria, { 'nama': datCriteria.namaCriteria  });								
									data.nilaiTotal = (valCriteria!.coreFactor / 100) * data.coreFactor + (valCriteria!.secondaryFactor / 100) * data.secondFactor  	
								}
							})
						}else{
							avgTotalCriteria.listCandidate.map(data => {
								if(data.nama == exiestDat.nama){
									data.coreFactorDesc.push(listCandidateDat.bobotValue)
									data.coreFactor = data.coreFactorDesc.reduce((x, y) =>x+y) / data.coreFactorDesc.length
									const valCriteria = _.find(criteria, { 'nama': datCriteria.namaCriteria  });								
									data.nilaiTotal = (valCriteria!.coreFactor / 100) * data.coreFactor + (valCriteria!.secondaryFactor / 100) * data.secondFactor
								}
							})
						}
					}
				})
			})
		})


		result.avgTotalCriteria.push(avgTotalCriteria)
	})

	//ranking
	result.avgTotalCriteria.map(datCriteria => {
		datCriteria.listCandidate.map(datCandidate => {
			const existCandidate  = _.find(result.ranking, { nameCandidate: datCandidate.nama });
			const currentCriteria = _.find(criteria, { nama: datCriteria.namaCriteria });
			let newCandidateDat: RankingType;
			if(!existCandidate){
				newCandidateDat = {
					nameCandidate: datCandidate.nama,
					value: (currentCriteria!.bobot/100) * datCandidate.nilaiTotal  
				}
				result.ranking.push(newCandidateDat);
			}else{
				result.ranking.map(data => {
					if(data.nameCandidate == existCandidate.nameCandidate){
						data.value +=  (currentCriteria!.bobot/100) * datCandidate.nilaiTotal
					}
				})
			}
		})
	})

	return result;
}
