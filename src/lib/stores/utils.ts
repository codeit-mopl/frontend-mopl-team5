import {type SortDirection} from "@/lib/api";

const loadingKey = 'loading';
const errorKey = 'error';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExecuteOptions<T, S = any> = {
  onSuccess?: (
      result: T,
      set: (state: S | Partial<S> | ((prev: S) => S | Partial<S>)) => void,
      get: () => S
  ) => void;
  shouldThrow?: boolean;
  ignoreLoading?: boolean;
};

/**
 * 기본 비동기 액션 처리 유틸리티
 *
 * @param set - Zustand set 함수
 * @param get - Zustand get 함수
 * @param asyncFn - 실행할 비동기 함수
 * @param options - 추가 옵션
 */
export async function execute<T, S = any>(
    set: (state: S | Partial<S> | ((prev: S) => S | Partial<S>)) => void,
    get: () => S,
    asyncFn: () => Promise<T>,
    options: ExecuteOptions<T, S> = {}
): Promise<T | undefined> {
  const {
    onSuccess = (_result, _set) => {_set({data: _result} as unknown as Partial<S>)},
    shouldThrow = false,
  } = options;

  // 중복 요청 방지
  if ((get() as any)[loadingKey] && options?.ignoreLoading !== true) {
    console.warn(`로딩 중이므로 요청이 무시되었습니다.`);
    return undefined;
  }

  try {
    // 로딩 시작
    set({
      [loadingKey]: true,
      [errorKey]: null
    } as unknown as Partial<S>);

    const result = await asyncFn();

    // 성공 처리
    onSuccess?.(result, set, get);

    return result;
  } catch (error) {
    // 에러 처리
    set({
      [errorKey]: (error as Error).message || '알 수 없는 오류가 발생했습니다.'
    } as unknown as Partial<S>);

    console.error(error);

    if (shouldThrow) {
      throw error;
    }

    return undefined;
  } finally {
    set({ [loadingKey]: false } as unknown as Partial<S>);
  }
}


/**
 * 정렬 순서를 고려한 아이템 삽입
 */
export function insertItemWithSort<T extends { id: string }>(
  items: T[],
  newItem: T,
  sortBy?: string,
  sortDirection?: SortDirection
): T[] {
  // 중복 체크
  const isDuplicate = items.some(item => item.id === newItem.id);
  if (isDuplicate) {
    console.warn(`중복된 아이템이 감지되었습니다: ${newItem.id}`);
    return items;
  }

  // 정렬 기준이 없으면 맨 앞에 추가
  if (!sortBy || !sortDirection) {
    return [newItem, ...items];
  }

  // 정렬된 위치 찾기
  const newItems = [...items, newItem];
  return newItems.sort((a, b) => {
    const aValue = (a as any)[sortBy];
    const bValue = (b as any)[sortBy];
    
    if (sortDirection === 'ASCENDING') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

