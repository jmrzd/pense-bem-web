/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_CODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
