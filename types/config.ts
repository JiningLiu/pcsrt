// Program configuration
export class Configuration {
    auth: boolean = false;
    startStreamOnLaunch: boolean = false;
    verbose: boolean = false;
    port: number = 5483;

    camera: CameraConfiguration = new CameraConfiguration();
    stream: StreamConfiguration = new StreamConfiguration();

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

export enum ConfigurationOption {
    AUTH_ENABLED = 'auth',
    START_STREAM_ON_LAUNCH = 'startStreamOnLaunch',
    VERBOSE = 'verbose',
    PORT = 'port',

    // Camera
    CAMERA_AE_ENABLE = 'camera.ae-enable',
    CAMERA_AE_CONSTRAINT_MODE = 'camera.ae-constraint-mode',
    CAMERA_AE_EXPOSURE_MODE = 'camera.ae-exposure-mode',
    CAMERA_AE_METERING_MODE = 'camera.ae-metering-mode',
    CAMERA_AE_FLICKER_PERIOD = 'camera.ae-flicker-period',
    CAMERA_EXPOSURE_VALUE = 'camera.exposure-value',
    CAMERA_EXPOSURE_TIME_MODE = 'camera.exposure-time-mode',
    CAMERA_EXPOSURE_TIME = 'camera.exposure-time',
    CAMERA_ANALOGUE_GAIN_MODE = 'camera.analogue-gain-mode',
    CAMERA_ANALOGUE_GAIN = 'camera.analogue-gain',
    CAMERA_DIGITAL_GAIN = 'camera.digital-gain',
    CAMERA_AF_MODE = 'camera.af-mode',
    CAMERA_AF_METERING = 'camera.af-metering',
    CAMERA_AF_RANGE = 'camera.af-range',
    CAMERA_AF_SPEED = 'camera.af-speed',
    CAMERA_AF_WINDOWS = 'camera.af-windows',
    CAMERA_LENS_POSITION = 'camera.lens-position',
    CAMERA_AWB_ENABLE = 'camera.awb-enable',
    CAMERA_AWB_MODE = 'camera.awb-mode',
    CAMERA_COLOUR_GAINS = 'camera.colour-gains',
    CAMERA_COLOUR_CORRECTION_MATRIX = 'camera.colour-correction-matrix',
    CAMERA_BRIGHTNESS = 'camera.brightness',
    CAMERA_CONTRAST = 'camera.contrast',
    CAMERA_SATURATION = 'camera.saturation',
    CAMERA_SHARPNESS = 'camera.sharpness',
    CAMERA_GAMMA = 'camera.gamma',
    CAMERA_SCALER_CROP = 'camera.scaler-crop',

    // Stream
    STREAM_SRT_PORT = 'stream.srtPort',
    STREAM_SRT_LATENCY = 'stream.srtLatency',
    STREAM_FRAME_WIDTH = 'stream.frameWidth',
    STREAM_FRAME_HEIGHT = 'stream.frameHeight',
    STREAM_FRAME_RATE = 'stream.frameRate',
    STREAM_QUEUE_MAX_SIZE_BUFFERS = 'stream.queueMaxSizeBuffers',
    STREAM_QUEUE_FLUSH_ON_EOS = 'stream.queueFlushOnEos',
    STREAM_QUEUE_MAX_SIZE_TIME = 'stream.queueMaxSizeTime',
    STREAM_X264ENC_TUNE = 'stream.x264encTune',
    STREAM_X264ENC_SPEED_PRESET = 'stream.x264encSpeedPreset',
    STREAM_X264ENC_BITRATE = 'stream.x264encBitrate',
    STREAM_X264ENC_BFRAMES = 'stream.x264encBFrames',
    STREAM_X264ENC_RC_LOOKAHEAD = 'stream.x264encRcLookahead',
    STREAM_X264ENC_SYNC_LOOKAHEAD = 'stream.x264encSyncLookahead',
    STREAM_X264ENC_SLICED_THREADS = 'stream.x264encSlicedThreads',
    STREAM_X264ENC_THREADS = 'stream.x264encThreads',
    STREAM_ALSASRC_DEVICE = 'stream.alsasrcDevice',
    STREAM_AUDIO_SAMPLE_RATE = 'stream.audioSampleRate',
    STREAM_AUDIO_CHANNELS = 'stream.audioChannels',
    STREAM_AUDIO_BITRATE = 'stream.audioBitrate',
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

    static fromJSON(json: Partial<AfWindow>): AfWindow {
        return Object.assign(new AfWindow(), json);
    }

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

    static fromJSON(json: Partial<ColourGains>): ColourGains {
        return Object.assign(new ColourGains(), json);
    }

    toGstValueArray(): string {
        if (this.red === undefined && this.blue === undefined) {
            return "<>";
        }
        return `<${this.red},${this.blue}>`;
    }
}

export class ColourCorrectionMatrix {
    matrix?: [[number, number, number], [number, number, number], [number, number, number]];

    static fromJSON(json: Partial<ColourCorrectionMatrix>): ColourCorrectionMatrix {
        return Object.assign(new ColourCorrectionMatrix(), json);
    }

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

    static fromJSON(json: Partial<ScalerCrop>): ScalerCrop {
        return Object.assign(new ScalerCrop(), json);
    }

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
        config["colour-gains"] = ColourGains.fromJSON(config["colour-gains"]);
        config["colour-correction-matrix"] = ColourCorrectionMatrix.fromJSON(config["colour-correction-matrix"]);
        config["scaler-crop"] = ScalerCrop.fromJSON(config["scaler-crop"]);
        config["af-windows"] = (config["af-windows"] || []).map(window => AfWindow.fromJSON(window));
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