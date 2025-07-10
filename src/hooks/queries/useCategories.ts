import { CATEGORY_DEFAULT_FILTER } from "@/constants/filters";
import { EventCategory, FilterOption } from "@/types/event";
import { ApiResponse } from "@/types/response";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async (): Promise<ApiResponse<EventCategory[]>> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("카테고리를 불러오는데 실패했습니다.");
  }
  return response.json();
};

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    select: (data): FilterOption[] => [
      CATEGORY_DEFAULT_FILTER,
      ...data.data.map((category) => ({
        id: category.slug,
        label: category.name,
        value: category.id,
        type: "category" as const,
        isDefault: false,
      })),
    ],
  });
};

export default useCategories;
