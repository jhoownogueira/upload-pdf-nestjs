-- CreateTable
CREATE TABLE "tcc_arquivo" (
    "id" TEXT NOT NULL,
    "nome_arquivo" TEXT NOT NULL,
    "autor_arquivo" TEXT NOT NULL,
    "url_arquivo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tcc_arquivo_pkey" PRIMARY KEY ("id")
);
