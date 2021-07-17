/*
  Warnings:

  - You are about to alter the column `nilaiTarget` on the `SubCriteria` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

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
    "citeriaId" INTEGER NOT NULL,
    FOREIGN KEY ("citeriaId") REFERENCES "Criteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SubCriteria" ("citeriaId", "createdAt", "id", "nama", "nilaiTarget", "type", "updatedAt") SELECT "citeriaId", "createdAt", "id", "nama", "nilaiTarget", "type", "updatedAt" FROM "SubCriteria";
DROP TABLE "SubCriteria";
ALTER TABLE "new_SubCriteria" RENAME TO "SubCriteria";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
