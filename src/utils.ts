type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
