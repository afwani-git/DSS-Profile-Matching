/*
  Warnings:

  - You are about to drop the column `citeriaId` on the `SubCriteria` table. All the data in the column will be lost.
  - Added the required column `criteriaId` to the `SubCriteria` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubCriteria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nama" TEXT NOT NULL,
    "nilaiTarget" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    FOREIGN KEY ("criteriaId") REFERENCES "Criteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubCriteria" ("createdAt", "id", "nama", "nilaiTarget", "type", "updatedAt") SELECT "createdAt", "id", "nama", "nilaiTarget", "type", "updatedAt" FROM "SubCriteria";
DROP TABLE "SubCriteria";
ALTER TABLE "new_SubCriteria" RENAME TO "SubCriteria";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
