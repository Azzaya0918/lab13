# /test — Unit Test үүсгэх

Доорх функц/модулийн Jest unit test-ийг testing pyramid-аар үүсгэ:

1. **Happy path** — Хэвийн ажиллагаа
2. **Edge cases** — null, undefined, empty array, 0, negative
3. **Error cases** — Invalid input, database error, not found
4. **Boundary values** — Хязгаарын утга (max length, min/max number)

Шаардлага:
- `describe` / `it` бүтэц ашиглах
- Mock: `jest.mock()` database layer-ийг mock хий
- `beforeEach` / `afterEach` cleanup
- Test нэр нь "should ... when ..." форматтай байх

≥5 test case үүсгэ.
