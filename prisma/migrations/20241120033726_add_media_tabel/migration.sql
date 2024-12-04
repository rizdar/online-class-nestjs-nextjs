/*
  Warnings:

  - The `image_id` column on the `meeting_class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "meeting_class" DROP COLUMN "image_id",
ADD COLUMN     "image_id" UUID;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_media_id" UUID,
ADD COLUMN     "avatar_path" TEXT;

-- CreateTable
CREATE TABLE "media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "media_path" TEXT,
    "media_url" TEXT,
    "media_name" TEXT,
    "media_origin_name" TEXT,
    "media_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatar_media_id_fkey" FOREIGN KEY ("avatar_media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_class" ADD CONSTRAINT "meeting_class_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
