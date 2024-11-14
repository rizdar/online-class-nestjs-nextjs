-- CreateTable
CREATE TABLE "zoom" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "topic_name" TEXT NOT NULL,
    "class_id" UUID NOT NULL,
    "description" TEXT,
    "meeting_number" TEXT NOT NULL,
    "schedule_at" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "credentials" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "zoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zoom" ADD CONSTRAINT "zoom_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "meeting_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
