import type { BunFile } from "bun";

import { AeConstraintMode, AeExposureMode, AeMeteringMode, AfMetering, AfMode, AfRange, AfSpeed, AfWindow, AnalogueGainMode, AwbMode, ColourCorrectionMatrix, ColourGains, ConfigurationOption, ExposureTimeMode, ScalerCrop, X264EncSpeedPreset, X264EncTune, type Configuration } from "../types/config";

export async function setConfiguration(config: Configuration, configFile: BunFile, setting: { key: ConfigurationOption; value: any }, startup: () => Promise<void> = async () => { }) {
    switch (setting.key) {
        case ConfigurationOption.AUTH_ENABLED:
            config.auth = Boolean(setting.value);
            break;
        case ConfigurationOption.START_STREAM_ON_LAUNCH:
            config.startStreamOnLaunch = Boolean(setting.value);
            break;
        case ConfigurationOption.VERBOSE:
            config.verbose = Boolean(setting.value);
            break;
        case ConfigurationOption.PORT:
            config.port = Number(setting.value);
            break;

        // Camera
        case ConfigurationOption.CAMERA_AE_ENABLE:
            config.camera["ae-enable"] = Boolean(setting.value);
            break;
        case ConfigurationOption.CAMERA_AE_CONSTRAINT_MODE:
            config.camera["ae-constraint-mode"] = AeConstraintMode[setting.value as keyof typeof AeConstraintMode];
            break;
        case ConfigurationOption.CAMERA_AE_EXPOSURE_MODE:
            config.camera["ae-exposure-mode"] = AeExposureMode[setting.value as keyof typeof AeExposureMode];
            break;
        case ConfigurationOption.CAMERA_AE_METERING_MODE:
            config.camera["ae-metering-mode"] = AeMeteringMode[setting.value as keyof typeof AeMeteringMode];
            break;
        case ConfigurationOption.CAMERA_AE_FLICKER_PERIOD:
            config.camera["ae-flicker-period"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_EXPOSURE_VALUE:
            config.camera["exposure-value"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_EXPOSURE_TIME_MODE:
            config.camera["exposure-time-mode"] = ExposureTimeMode[setting.value as keyof typeof ExposureTimeMode];
            break;
        case ConfigurationOption.CAMERA_EXPOSURE_TIME:
            config.camera["exposure-time"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_ANALOGUE_GAIN_MODE:
            config.camera["analogue-gain-mode"] = AnalogueGainMode[setting.value as keyof typeof AnalogueGainMode];
            break;
        case ConfigurationOption.CAMERA_ANALOGUE_GAIN:
            config.camera["analogue-gain"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_DIGITAL_GAIN:
            config.camera["digital-gain"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_AF_MODE:
            config.camera["af-mode"] = AfMode[setting.value as keyof typeof AfMode];
            break;
        case ConfigurationOption.CAMERA_AF_METERING:
            config.camera["af-metering"] = AfMetering[setting.value as keyof typeof AfMetering];
            break;
        case ConfigurationOption.CAMERA_AF_RANGE:
            config.camera["af-range"] = AfRange[setting.value as keyof typeof AfRange];
            break;
        case ConfigurationOption.CAMERA_AF_SPEED:
            config.camera["af-speed"] = AfSpeed[setting.value as keyof typeof AfSpeed];
            break;
        case ConfigurationOption.CAMERA_AF_WINDOWS:
            config.camera["af-windows"] = (setting.value as any[]).map(window => AfWindow.fromJSON(window));
            break;
        case ConfigurationOption.CAMERA_LENS_POSITION:
            config.camera["lens-position"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_AWB_ENABLE:
            config.camera["awb-enable"] = Boolean(setting.value);
            break;
        case ConfigurationOption.CAMERA_AWB_MODE:
            config.camera["awb-mode"] = AwbMode[setting.value as keyof typeof AwbMode];
            break;
        case ConfigurationOption.CAMERA_COLOUR_GAINS:
            config.camera["colour-gains"] = ColourGains.fromJSON(setting.value);
            break;
        case ConfigurationOption.CAMERA_COLOUR_CORRECTION_MATRIX:
            config.camera["colour-correction-matrix"] = ColourCorrectionMatrix.fromJSON(setting.value);
            break;
        case ConfigurationOption.CAMERA_BRIGHTNESS:
            config.camera["brightness"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_CONTRAST:
            config.camera["contrast"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_SATURATION:
            config.camera["saturation"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_SHARPNESS:
            config.camera["sharpness"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_GAMMA:
            config.camera["gamma"] = Number(setting.value);
            break;
        case ConfigurationOption.CAMERA_SCALER_CROP:
            config.camera["scaler-crop"] = ScalerCrop.fromJSON(setting.value);
            break;

        // Stream
        case ConfigurationOption.STREAM_SRT_PORT:
            config.stream.srtPort = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_SRT_LATENCY:
            config.stream.srtLatency = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_FRAME_WIDTH:
            config.stream.frameWidth = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_FRAME_HEIGHT:
            config.stream.frameHeight = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_FRAME_RATE:
            config.stream.frameRate = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_QUEUE_MAX_SIZE_BUFFERS:
            config.stream.queueMaxSizeBuffers = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_QUEUE_FLUSH_ON_EOS:
            config.stream.queueFlushOnEos = Boolean(setting.value);
            break;
        case ConfigurationOption.STREAM_QUEUE_MAX_SIZE_TIME:
            config.stream.queueMaxSizeTime = Number(setting.value);;
            break;
        case ConfigurationOption.STREAM_X264ENC_TUNE:
            config.stream.x264encTune = X264EncTune[setting.value as keyof typeof X264EncTune];
            break;
        case ConfigurationOption.STREAM_X264ENC_SPEED_PRESET:
            config.stream.x264encSpeedPreset = X264EncSpeedPreset[setting.value as keyof typeof X264EncSpeedPreset];
            break;
        case ConfigurationOption.STREAM_X264ENC_BITRATE:
            config.stream.x264encBitrate = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_X264ENC_BFRAMES:
            config.stream.x264encBFrames = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_X264ENC_RC_LOOKAHEAD:
            config.stream.x264encRcLookahead = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_X264ENC_SYNC_LOOKAHEAD:
            config.stream.x264encSyncLookahead = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_X264ENC_SLICED_THREADS:
            config.stream.x264encSlicedThreads = Boolean(setting.value);
            break;
        case ConfigurationOption.STREAM_X264ENC_THREADS:
            config.stream.x264encThreads = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_ALSASRC_DEVICE:
            config.stream.alsasrcDevice = String(setting.value);
            break;
        case ConfigurationOption.STREAM_AUDIO_SAMPLE_RATE:
            config.stream.audioSampleRate = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_AUDIO_CHANNELS:
            config.stream.audioChannels = Number(setting.value);
            break;
        case ConfigurationOption.STREAM_AUDIO_BITRATE:
            config.stream.audioBitrate = Number(setting.value);
            break;

        default:
            throw new Error(`Unknown configuration option: ${setting.key}`);
    }

    await configFile.write(JSON.stringify(config));

    if (setting.key === ConfigurationOption.AUTH_ENABLED) {
        await startup();
    }
}