#include <napi.h>
#pragma once

namespace imageProcess {
    class RescaleImageSize : public Napi::ObjectWrap<RescaleImageSize> {
        public:
            static Napi::Object Init(Napi::Env env, Napi::Object exports);
            RescaleImageSize(const Napi::CallbackInfo& info);

        private:
            static Napi::FunctionReference constructor;
            Napi::FunctionReference jsFnRef;
            Napi::Function jsFn;

            void RescaleImageFileSize(const Napi::CallbackInfo& info);
    };
}