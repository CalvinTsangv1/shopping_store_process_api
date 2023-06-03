#include <napi.h>
#pragma once

namespace imageProcess {
    class RenameFile : public Napi::ObjectWrap<RenameFile> {
        public:
            static Napi::Object Init(Napi::Env env, Napi::Object exports);
            RenameFile(const Napi::CallbackInfo& info);

        private:
            static Napi::FunctionReference constructor;
            Napi::FunctionReference jsFnRef;
            Napi::Function jsFn;

            void RenameImageFile(const Napi::CallbackInfo& info);
    };
}