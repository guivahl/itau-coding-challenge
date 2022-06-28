-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "replyId" INTEGER;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
