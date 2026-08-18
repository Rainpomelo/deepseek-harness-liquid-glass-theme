export interface KnobProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (value: number) => void;
}
export declare function Knob({ label, value, min, max, step, unit, onChange }: KnobProps): import("react").JSX.Element;
export interface SegmentedOption<T extends string> {
    id: T;
    label: string;
}
export interface SegmentedProps<T extends string> {
    label: string;
    value: T;
    options: readonly SegmentedOption<T>[];
    onSelect: (value: T) => void;
}
export declare function Segmented<T extends string>({ label, value, options, onSelect }: SegmentedProps<T>): import("react").JSX.Element;
export declare function extractVideoPoster(fileOrBlob: Blob): Promise<string>;
export declare function processWallpaperFile(file: File): Promise<{
    type: 'image' | 'video';
    blob: Blob;
    url: string;
    poster?: string;
}>;
export declare function fileToDataUrl(file: File): Promise<string>;
//# sourceMappingURL=LiquidGlassControls.d.ts.map