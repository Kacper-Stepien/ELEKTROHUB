import { MemoryRouter } from "react-router-dom";
import usePagination from "./usePagination";
import { renderHook } from "@testing-library/react-hooks";
import { ReactNode } from "react";

describe("My component using the usePagination hook", () => {
  test("should have page 1 when ?page=1", () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=1"]}>{children}</MemoryRouter>
      ),
    });
    const { page } = result!.current;
    expect(page).toBe("1");
  });

  test("should have page 1 when ?page is not present", () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
      ),
    });
    const { page } = result!.current;
    expect(page).toBe("1");
  });

  test("should have page 1 when page is not a number", async () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=abc"]}>{children}</MemoryRouter>
      ),
    });
    const { page } = result.current;
    expect(page).toBe("1");
  });

  test("should have page 1 when page is less than 1", async () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=-1"]}>{children}</MemoryRouter>
      ),
    });
    const { page } = result.current;
    expect(page).toBe("1");
  });

  test("should have page 10 when totalPages is 10 and page is greater than totalPages", async () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=11"]}>{children}</MemoryRouter>
      ),
    });
    const { page } = result.current;
    expect(page).toBe("10");
  });

  test("should navigate to page 2 when goToPage(2)", () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=1"]}>{children}</MemoryRouter>
      ),
    });
    const { goToPage } = result!.current;
    goToPage(2);
    const { page } = result!.current;
    expect(page).toBe("2");
  });

  test("should navigate to page 10 when goToPage(11)", () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=1"]}>{children}</MemoryRouter>
      ),
    });
    const { goToPage } = result!.current;
    goToPage(11);
    const { page } = result!.current;
    expect(page).toBe("10");
  });

  test("should navigate to page 1 when goToPage(0)", () => {
    const { result } = renderHook(() => usePagination(10), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={["?page=1"]}>{children}</MemoryRouter>
      ),
    });
    const { goToPage } = result!.current;
    goToPage(0);
    const { page } = result!.current;
    expect(page).toBe("1");
  });
});
