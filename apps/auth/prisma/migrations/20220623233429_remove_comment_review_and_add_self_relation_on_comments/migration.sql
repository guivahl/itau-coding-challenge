/*
  Warnings:

  - You are about to drop the `commentsReplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "commentsReplies" DROP CONSTRAINT "commentsReplies_commentId_fkey";

-- DropForeignKey
ALTER TABLE "commentsReplies" DROP CONSTRAINT "commentsReplies_userId_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "citationId" INTEGER;

-- DropTable
DROP TABLE "commentsReplies";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_citationId_fkey" FOREIGN KEY ("citationId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
