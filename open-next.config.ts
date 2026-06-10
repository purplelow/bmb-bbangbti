import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 정적 페이지 + 동적 OG 라우트만 있는 앱이라 incremental cache(R2)는 불필요
export default defineCloudflareConfig();
