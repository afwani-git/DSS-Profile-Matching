-- CreateTable
CREATE TABLE "Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "nilai" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TabelBobotGap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "selisih" REAL NOT NULL,
    "bobtNilia" REAL NOT NULL,
    "keterangan" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Criteria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "bobot" REAL NOT NULL,
    "coreFactor" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "SubCriteria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "nilaiTarget" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "citeriaId" INTEGER NOT NULL,
    FOREIGN KEY ("citeriaId") REFERENCES "Criteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CandidateToSubCriteria" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Candidate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "SubCriteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToSubCriteria_AB_unique" ON "_CandidateToSubCriteria"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToSubCriteria_B_index" ON "_CandidateToSubCriteria"("B");
