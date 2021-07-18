/*
  Warnings:

  - You are about to alter the column `nilai` on the `Candidate` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

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
    "nilai" REAL DEFAULT 0
);
INSERT INTO "new_Candidate" ("alamat", "createdAt", "email", "id", "nama", "nilai", "updatedAt") SELECT "alamat", "createdAt", "email", "id", "nama", "nilai", "updatedAt" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
