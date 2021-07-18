/*
  Warnings:

  - Added the required column `email` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT,
    "email" TEXT NOT NULL,
    "nilai" TEXT NOT NULL
);
INSERT INTO "new_Candidate" ("createdAt", "id", "nama", "nilai", "updatedAt") SELECT "createdAt", "id", "nama", "nilai", "updatedAt" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
