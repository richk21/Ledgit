import { useEffect, useRef, useState } from "react";

export function useDynamicSvgImport(svgName) {
    const importedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
    useEffect(() => {
      setLoading(true);
      const importSvgIcon = async () => {
        try {
          importedIconRef.current = (await import(`../../Assets/${svgName}.svg`)).default;
        } catch (err) {
          setError(err);
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      importSvgIcon();
    }, [svgName]);
  
    return { error, loading, Svg: importedIconRef.current };
}