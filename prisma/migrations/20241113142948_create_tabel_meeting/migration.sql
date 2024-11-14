-- CreateEnum
CREATE TYPE "class_status" AS ENUM ('pending', 'published', 'cancel');

-- CreateTable
CREATE TABLE "meeting_class" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "class_name" TEXT,
    "class_description" TEXT,
    "class_status" "class_status" NOT NULL DEFAULT 'pending',
    "image" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "mentor_id" UUID NOT NULL,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meeting_class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meeting_class" ADD CONSTRAINT "meeting_class_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_class" ADD CONSTRAINT "meeting_class_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
