#include <napi.h>

namespace imageProcess {
    class ResizeImage : public Napi::ObjectWrap<ResizeImage> {
        public:
            static Napi::Object Init(Napi::Env env, Napi::Object exports);
            ResizeImage(const Napi::CallbackInfo& info);

        private:
            static Napi::FunctionReference constructor;
            Napi::FunctionReference jsFnRef;
            Napi::Function jsFn;

            void ResizeImageFile(const Napi::CallbackInfo& info);
    };
}