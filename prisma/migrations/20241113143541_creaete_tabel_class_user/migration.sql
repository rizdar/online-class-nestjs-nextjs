-- CreateTable
CREATE TABLE "class_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "has_join" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "class_user" ADD CONSTRAINT "class_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_user" ADD CONSTRAINT "class_user_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "meeting_class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
