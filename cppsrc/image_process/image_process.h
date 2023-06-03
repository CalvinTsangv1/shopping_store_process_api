#include <napi.h>
#pragma once

namespace imageProcess {
    Napi::Object Init(Napi::Env env, Napi::Object exports);
    Napi::Value ConvertImageFileFormat(const Napi::CallbackInfo& info);
    Napi::Value RenameImageFile(const Napi::CallbackInfo& info);
    Napi::Value RescaleImageFileSize(const Napi::CallbackInfo& info);
    Napi::Value ResizeImageFile(const Napi::CallbackInfo& info);
}