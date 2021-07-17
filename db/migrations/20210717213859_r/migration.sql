-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "sentTo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("createdAt", "expiresAt", "hashedToken", "id", "sentTo", "type", "updatedAt", "userId") SELECT "createdAt", "expiresAt", "hashedToken", "id", "sentTo", "type", "updatedAt", "userId" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token.hashedToken_type_unique" ON "Token"("hashedToken", "type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
