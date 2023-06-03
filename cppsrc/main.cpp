#include <napi.h>
#include "image_process/image_process.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
    return imageProcess::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
