export class Configuration {
    auth: boolean = false;
    camera: CameraConfiguration = new CameraConfiguration();
    stream: StreamConfiguration = new StreamConfiguration();

    startStreamOnLaunch: boolean = false;
    verbose: boolean = false;
    port: number = 5483;

    static fromJSON(json: Partial<Configuration>): Configuration {
        const config = Object.assign(new Configuration(), json);
        config.camera = CameraConfiguration.fromJSON(config.camera);
        config.stream = StreamConfiguration.fromJSON(config.stream);
        return config;
    }

    toGstCommand(): string {
        return String.raw`
gst-launch-1.0 -e \
    mpegtsmux name=mux alignment=7 ! \
    srtsink \
        uri="srt://${this.stream.srtHost}:${this.stream.srtPort}?mode=${this.stream.srtMode}&latency=${this.stream.srtLatency}&transtype=live" \
        wait-for-connection=false \
    libcamerasrc ${this.camera.toLibcamerasrcPipelineArgs()} ! \
    ${this.stream.cameraCapability},format=${this.stream.pixelFormat},width=${this.stream.frameWidth},height=${this.stream.frameHeight},framerate=${this.stream.frameRate}/1 ! \
    identity silent=false ! \
    queue max-size-buffers=${this.stream.queueMaxSizeBuffers} flush-on-eos=${this.stream.queueFlushOnEos} ! \
    x264enc \
        tune=${this.stream.x264encTune} \
        speed-preset=${this.stream.x264encSpeedPreset} \
        bitrate=${this.stream.x264encBitrate} \
        bframes=${this.stream.x264encBFrames} \
        rc-lookahead=${this.stream.x264encRcLookahead} \
        sync-lookahead=${this.stream.x264encSyncLookahead} \
        sliced-threads=${this.stream.x264encSlicedThreads} \
        threads=${this.stream.x264encThreads} \
        aud=true ! \
    ${this.stream.encodedFormat},profile=${this.stream.encoderProfile} ! \
    h264parse config-interval=1 ! \
    queue max-size-time=${this.stream.queueMaxSizeTime} ! \
    mux. \
    alsasrc \
        device="${this.stream.alsasrcDevice}" \
        do-timestamp=${this.stream.alsasrcDoTimestamp} ! \
    audioconvert ! \
    audioresample ! \
    ${this.stream.audioCapability},rate=${this.stream.audioSampleRate},channels=${this.stream.audioChannels} ! \
    voaacenc bitrate=${this.stream.audioBitrate} ! \
    aacparse ! \
    mux.
        `.replace(/\\\n\s*/g, '').trim()
    }
}

// Camera configuration
export enum AeConstraintMode {
    NORMAL = 'normal',
    HIGHLIGHT = 'highlight',
    SHADOWS = 'shadows',
    CUSTOM = 'custom',
}

export enum AeExposureMode {
    NORMAL = 'normal',
    SHORT = 'short',
    LONG = 'long',
    CUSTOM = 'custom',
}

export enum AeMeteringMode {
    CENTRE_WEIGHTED = 'centre-weighted',
    SPOT = 'spot',
    MATRIX = 'matrix',
    CUSTOM = 'custom',
}

export enum ExposureTimeMode {
    AUTO = 'auto',
    MANUAL = 'manual',
}

export enum AnalogueGainMode {
    AUTO = 'auto',
    MANUAL = 'manual',
}

export enum AfMode {
    MANUAL = 'manual',
    AUTO = 'auto',
    CONTINUOUS = 'continuous',
}

export enum AfMetering {
    CENTRE = 'centre',
    AVERAGE = 'average',
    SPOT = 'spot',
    AUTO = 'auto',
}

export enum AfRange {
    NORMAL = 'normal',
    MACRO = 'macro',
    FULL = 'full',
}

export enum AfSpeed {
    NORMAL = 'normal',
    FAST = 'fast',
}

export class AfWindow {
    x?: number;
    y?: number;
    width?: number;
    height?: number;

    toGstValueArray(): string {
        if (this.x === undefined && this.y === undefined && this.width === undefined && this.height === undefined) {
            return "<>";
        }
        return `<${this.x},${this.y},${this.width},${this.height}>`;
    }
}

export enum AwbMode {
    AUTO = 'auto',
    INCANDESCENT = 'incandescent',
    TUNGSTEN = 'tungsten',
    FLUORESCENT = 'fluorescent',
    INDOOR = 'indoor',
    DAYLIGHT = 'daylight',
    CLOUDY = 'cloudy',
    CUSTOM = 'custom',
}

export class ColourGains {
    red?: number;
    blue?: number;

    toGstValueArray(): string {
        if (this.red === undefined && this.blue === undefined) {
            return "<>";
        }
        return `<${this.red},${this.blue}>`;
    }
}

export class ColourCorrectionMatrix {
    matrix?: [[number, number, number], [number, number, number], [number, number, number]];

    toGstValueArray(): string {
        if (this.matrix === undefined) {
            return "<>";
        }
        return "<" + this.matrix.map(row => row.join(",")).join(",") + ">";
    }
}

export class ScalerCrop {
    x?: number;
    y?: number;
    width?: number;
    height?: number;

    toGstValueArray(): string {
        if (this.x === undefined && this.y === undefined && this.width === undefined && this.height === undefined) {
            return "<>";
        }
        return `<${this.x},${this.y},${this.width},${this.height}>`;
    }
}

export class CameraConfiguration {
    "ae-enable": boolean = true;
    "ae-constraint-mode": AeConstraintMode = AeConstraintMode.NORMAL;
    "ae-exposure-mode": AeExposureMode = AeExposureMode.NORMAL;
    "ae-metering-mode": AeMeteringMode = AeMeteringMode.CENTRE_WEIGHTED;
    "ae-flicker-period": number = 0;
    "exposure-value": number = 0;
    "exposure-time-mode": ExposureTimeMode = ExposureTimeMode.AUTO;
    "exposure-time": number = 0;
    "analogue-gain-mode": AnalogueGainMode = AnalogueGainMode.AUTO;
    "analogue-gain": number = 0;
    "digital-gain": number = 0;
    "af-mode": AfMode = AfMode.MANUAL;
    "af-metering": AfMetering = AfMetering.AUTO;
    "af-range": AfRange = AfRange.NORMAL;
    "af-speed": AfSpeed = AfSpeed.NORMAL;
    "af-windows": AfWindow[] = [];
    "lens-position": number = 0;
    "awb-enable": boolean = true;
    "awb-mode": AwbMode = AwbMode.AUTO;
    "colour-gains": ColourGains = new ColourGains();
    "colour-correction-matrix": ColourCorrectionMatrix = new ColourCorrectionMatrix();
    "brightness": number = 0.0;
    "contrast": number = 1.0;
    "saturation": number = 1.0;
    "sharpness": number = 0.0;
    "gamma": number = 2.2;
    "scaler-crop": ScalerCrop = new ScalerCrop();

    static fromJSON(json: Partial<CameraConfiguration>): CameraConfiguration {
        const config = Object.assign(new CameraConfiguration(), json);
        config["colour-gains"] = Object.assign(new ColourGains(), config["colour-gains"]);
        config["colour-correction-matrix"] = Object.assign(new ColourCorrectionMatrix(), config["colour-correction-matrix"]);
        config["scaler-crop"] = Object.assign(new ScalerCrop(), config["scaler-crop"]);
        config["af-windows"] = (config["af-windows"] || []).map(window => Object.assign(new AfWindow(), window));
        return config;
    }

    toLibcamerasrcPipelineArgs(): string {
        return [
            `ae-enable=${this["ae-enable"]}`,
            `ae-constraint-mode=${this["ae-constraint-mode"]}`,
            `ae-exposure-mode=${this["ae-exposure-mode"]}`,
            `ae-metering-mode=${this["ae-metering-mode"]}`,
            `ae-flicker-period=${this["ae-flicker-period"]}`,
            `exposure-value=${this["exposure-value"]}`,
            `exposure-time-mode=${this["exposure-time-mode"]}`,
            `exposure-time=${this["exposure-time"]}`,
            `analogue-gain-mode=${this["analogue-gain-mode"]}`,
            `analogue-gain=${this["analogue-gain"]}`,
            `digital-gain=${this["digital-gain"]}`,
            `af-mode=${this["af-mode"]}`,
            `af-metering=${this["af-metering"]}`,
            `af-range=${this["af-range"]}`,
            `af-speed=${this["af-speed"]}`,
            `af-windows="<${this["af-windows"].map(window => window.toGstValueArray()).join(",")}>"`,
            `lens-position=${this["lens-position"]}`,
            `awb-enable=${this["awb-enable"]}`,
            `awb-mode=${this["awb-mode"]}`,
            `colour-gains="${this["colour-gains"].toGstValueArray()}"`,
            `colour-correction-matrix="${this["colour-correction-matrix"].toGstValueArray()}"`,
            `brightness=${this["brightness"]}`,
            `contrast=${this["contrast"]}`,
            `saturation=${this["saturation"]}`,
            `sharpness=${this["sharpness"]}`,
            `gamma=${this["gamma"]}`,
            `scaler-crop="${this["scaler-crop"].toGstValueArray()}"`,
        ].join(" ");
    }
}

// Stream configuration
export enum SrtMode {
    CALLER = 'caller',
    LISTENER = 'listener',
    RENDEZVOUS = 'rendezvous',
}

export enum X264EncTune {
    STILL_IMAGE = 'stillimage',
    FAST_DECODE = 'fastdecode',
    ZERO_LATENCY = 'zerolatency',
}

export enum X264EncSpeedPreset {
    NONE = 'none',
    ULTRAFAST = 'ultrafast',
    SUPERFAST = 'superfast',
    VERYFAST = 'veryfast',
    FASTER = 'faster',
    FAST = 'fast',
    MEDIUM = 'medium',
    SLOW = 'slow',
    SLOWER = 'slower',
    VERYSLOW = 'veryslow',
    PLACEBO = 'placebo',
}

export class StreamConfiguration {
    // srtsink
    readonly srtHost: string = "0.0.0.0";
    srtPort: number = 20240;
    readonly srtMode: SrtMode = SrtMode.LISTENER;
    srtLatency: number = 200;

    // caps spec
    readonly cameraCapability: string = "video/x-raw";
    readonly pixelFormat: string = "NV12";
    frameWidth: number = 1920;
    frameHeight: number = 1080;
    frameRate: number = 30;
    readonly encodedFormat: string = "video/x-h264";
    readonly encoderProfile: string = "main";

    // queue
    queueMaxSizeBuffers: number = 30;
    queueFlushOnEos: boolean = true;
    queueMaxSizeTime: number = 200000000;

    // x264enc
    x264encTune: X264EncTune = X264EncTune.ZERO_LATENCY;
    x264encSpeedPreset: X264EncSpeedPreset = X264EncSpeedPreset.ULTRAFAST;
    x264encBitrate: number = 12000;
    x264encBFrames: number = 0;
    x264encRcLookahead: number = 0;
    x264encSyncLookahead: number = 0;
    x264encSlicedThreads: boolean = true;
    x264encThreads: number = 4;
    readonly x264encAud: boolean = true

    // alsasrc
    alsasrcDevice: string = "default:CARD=A";
    readonly alsasrcDoTimestamp: boolean = true;

    // audio specs
    readonly audioCapability: string = "audio/x-raw";
    audioSampleRate: number = 48000;
    audioChannels: number = 1;
    audioBitrate: number = 128000;

    static fromJSON(json: Partial<StreamConfiguration>): StreamConfiguration {
        return Object.assign(new StreamConfiguration(), json);
    }
}