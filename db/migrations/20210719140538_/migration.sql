/*
  Warnings:

  - You are about to drop the `_CandidateToSubCriteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nilai` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_CandidateToSubCriteria_B_index";

-- DropIndex
DROP INDEX "_CandidateToSubCriteria_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CandidateToSubCriteria";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Penilaian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nilai" REAL DEFAULT 0,
    "subCiteriaId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    FOREIGN KEY ("subCiteriaId") REFERENCES "SubCriteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Candidate" ("alamat", "createdAt", "email", "id", "nama", "updatedAt") SELECT "alamat", "createdAt", "email", "id", "nama", "updatedAt" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
