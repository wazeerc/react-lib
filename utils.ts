import React from "react";

//#region Custom hooks
//#region useEffectWithMount

const NO_DEPENDENCIES: unknown[] = [];
/**
 * @summary Executes a callback function after the component has mounted and whenever the dependencies change,
 * useful in preventing memory leaks.
 * @param callback - The callback function to be executed.
 * @param dependencies - An optional array of dependencies.
 * @example
 * useEffectWithMount(() => console.log('Component has mounted!'), []);
 */
export const useEffectWithMount = (
  callback: () => void,
  dependencies: unknown[] = NO_DEPENDENCIES
): void => {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMounted.current ? callback() : (isMounted.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
//#endregion

//#region useWindowDimensions

type TWindowDimensions = {
  width: number;
  height: number;
};

type TDevice = {
  Mobile: boolean;
  Tablet: boolean;
  Desktop: boolean;
  XLDesktop: boolean;
};

interface IUseWindowDimensionsProps {
  windowDimensions: TWindowDimensions;
  device: TDevice;
}

// Breakpoints for different devices.
const breakpoints: { [key: string]: number } = {
  minTabletWidth: 768,
  minDesktopWidth: 1024,
  minXLDesktopWidth: 1440,
};

const getWindowDimensions = (): TWindowDimensions => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/**
 * @summary Provides the dimensions of the window and the device type.
 * @returns An object containing the window dimensions and the device type.
 * @example
 * To get the window dimensions:
 * const { windowDimensions } = useWindowDimensions();
 * console.log("Width: " + windowDimensions.width, "Height: " + windowDimensions.height);
 * @example
 * To verify the device type:
 * const { device } = useWindowDimensions();
 * console.log("Device type: " + (device.Mobile ? "Mobile" : "Not mobile"));
 */
export function useWindowDimensions(): IUseWindowDimensionsProps {
  const [windowDimensions, setWindowDimensions] =
    React.useState<TWindowDimensions>(getWindowDimensions());

  React.useLayoutEffect(() => {
    const handleWindowResize = (): void =>
      setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const device: TDevice = React.useMemo(() => {
    const { width } = windowDimensions;

    return {
      Mobile: width < breakpoints.minTabletWidth,
      Tablet:
        width >= breakpoints.minTabletWidth &&
        width < breakpoints.minDesktopWidth,
      Desktop:
        width >= breakpoints.minDesktopWidth &&
        width < breakpoints.minXLDesktopWidth,
      XLDesktop: width >= breakpoints.minXLDesktopWidth,
    };
  }, [windowDimensions]);

  return { windowDimensions, device };
}
//#endregion
//#endregion

//#region Utils
//#region setFocus

const NO_DELAY = 0;
/**
 * @summary Sets focus on the specified target element after an optional delay.
 * @param targetElement - The target element to set focus on, can be a React ref object, or a string selector.
 * @param delay - The delay in milliseconds before setting focus. Defaults to 0.
 * @throws Error if the target element is not found.
 * @example setFocus(inputElementRef);
 * @example or setFocus(".select-search-input", 1000);
 */
export const setFocus = (
  targetElement: React.RefObject<HTMLElement> | string,
  delay: number | undefined = NO_DELAY
): void => {
  let element: HTMLElement | null = null;

  if (typeof targetElement === "string")
    element = document.querySelector(targetElement);
  else element = targetElement?.current as HTMLElement | null;

  if (!element) throw new Error("Target element not found.");

  setTimeout(() => element.focus(), delay);
};

//#endregion
//#endregion
