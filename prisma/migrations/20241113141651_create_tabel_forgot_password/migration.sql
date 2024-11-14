-- CreateTable
CREATE TABLE "forgot_password" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "token" TEXT,
    "expired_at" TIMESTAMP(3),

    CONSTRAINT "forgot_password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forgot_password_email_key" ON "forgot_password"("email");
