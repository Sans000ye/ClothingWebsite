import { API_BASE } from "../config";

/**
 * Tự động nối đường dẫn ảnh với API_BASE nếu chưa có.
 * Nếu ảnh đã là URL đầy đủ thì giữ nguyên.
 */
export const resolveImagePath = (path) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path; // đã là URL đầy đủ
  }

  // Xóa dấu "/" đầu nếu có
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${API_BASE}/${cleanPath}`;
};
