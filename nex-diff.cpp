#include <cinttypes>
#include <cstdint>
#include <napi.h>

/**
 * Calculate the difficulty for a given block index.
 */
static Napi::Number GetDifficulty(const Napi::CallbackInfo& info)
{
    auto env = info.Env();
    const auto nBits = info[0].As<Napi::Number>().Uint32Value();

    int nShift = (nBits >> 24) & 0xff;
    double dDiff = double(0x0000ffff) / double(nBits & 0x00ffffff);

    while (nShift < 29) {
        dDiff *= 256.0;
        nShift++;
    }
    while (nShift > 29) {
        dDiff /= 256.0;
        nShift--;
    }

    return Napi::Number::New(env, dDiff);
}

static Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports["GetDifficulty"] = Napi::Function::New(env, GetDifficulty);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
