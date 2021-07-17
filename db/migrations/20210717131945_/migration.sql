/*
  Warnings:

  - Added the required column `secondaryFactor` to the `Criteria` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Criteria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "bobot" REAL NOT NULL,
    "coreFactor" REAL NOT NULL,
    "secondaryFactor" REAL NOT NULL
);
INSERT INTO "new_Criteria" ("bobot", "coreFactor", "createdAt", "id", "nama", "updatedAt") SELECT "bobot", "coreFactor", "createdAt", "id", "nama", "updatedAt" FROM "Criteria";
DROP TABLE "Criteria";
ALTER TABLE "new_Criteria" RENAME TO "Criteria";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
