import React, {useEffect} from 'react';
import { useQuery, BlitzPage } from 'blitz';
import fetchAllPenilaian from '../../../penilaians/queries/getPenilaians';
import fetchAllTableBobot from '../../../tabel-bobot-gaps/queries/getTabelBobotGaps';
import fetchAllCriteria from '../../../criteria/queries/getCriteria';
import { ProfileMatchingExec } from '../../../penilaians/helpers/profile-matching'; 	
import { AdminLayout } from '../../../core/layouts/Admin';

const RankingPage: BlitzPage = () => {

	const [ penilaian, resPenilaian ] = useQuery(fetchAllPenilaian, {});
	const [ gapTable, resTable ] = useQuery(fetchAllTableBobot,{});
	const [ criteria, resCriteria] = useQuery(fetchAllCriteria, {});


	const clickHandler = () => {
		ProfileMatchingExec(penilaian.penilaians, criteria.criteria, gapTable.tabelBobotGaps)
	}
	

	useEffect(() => {
		ProfileMatchingExec(penilaian.penilaians, criteria.criteria, gapTable.tabelBobotGaps)
	}, [gapTable, criteria]);

	return (
		<>
		<button
			onClick={clickHandler}
		>fooo</button>	
		</>
	)
} 

RankingPage.getLayout = (page) => (<AdminLayout>{page}</AdminLayout>) 

export default RankingPage;