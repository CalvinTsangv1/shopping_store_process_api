#include <napi.h>
#pragma once

namespace imageProcess {
    class ConvertImageFormat : public Napi::ObjectWrap<ConvertImageFormat> {
        public:
            static Napi::Object Init(Napi::Env env, Napi::Object exports);
            ConvertImageFormat(const Napi::CallbackInfo& info);

        private:
            static Napi::FunctionReference constructor;
            Napi::FunctionReference jsFnRef;
            Napi::Function jsFn;

            Napi::Value ConvertImageFileFormat(const Napi::CallbackInfo& info);
    };
}