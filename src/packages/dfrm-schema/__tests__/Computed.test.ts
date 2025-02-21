import { ComputedSchema } from "../Computed";

const bmi = new ComputedSchema({
  template: `IF(
    AND(
      ISNUMBER({weight}),
      ISNUMBER({height}),
      GT({weight}, 0),
      GT({height}, 0)
    ),
    ROUND({weight} / POWER({height} / 100, 2), 1)
  )`,
});

const bsaDubois = new ComputedSchema({
  template: `IF(
    AND(
      ISNUMBER({weight}),
      ISNUMBER({height}),
      GT({weight}, 0),
      GT({height}, 0)
    ),
    ROUND(0.007184 * POWER({weight}, 0.425) * POWER({height}, 0.725), 1)
  )`,
});

const bsaMonsteller = new ComputedSchema({
  template: `IF(
    AND(
      ISNUMBER({weight}),
      ISNUMBER({height}),
      GT({weight}, 0),
      GT({height}, 0)
    ),
    ROUND(0.016667 * POWER({weight}, 0.5) * POWER({height}, 0.5), 1)
  )`,
});

const options = {
  locale: "en",
  root: {},
  path: [],
  namePrefix: "",
};

const weight = 75;
const height = 165;

describe("Computed", () => {
  test("bmi", async () => {
    await expectBMI({}, undefined);
    await expectBMI({ weight }, undefined);
    await expectBMI({ height }, undefined);
    await expectBMI({ weight: 0, height }, undefined);
    await expectBMI({ weight, height: 0 }, undefined);
    await expectBMI({ weight, height }, 27.5);
  });

  test("bsa.dubois", async () => {
    await expectDuboisBSA({}, undefined);
    await expectDuboisBSA({ weight }, undefined);
    await expectDuboisBSA({ height }, undefined);
    await expectDuboisBSA({ weight: 0, height }, undefined);
    await expectDuboisBSA({ weight, height: 0 }, undefined);
    await expectDuboisBSA({ weight, height }, 1.8);
  });

  test("bsa.monsteller", async () => {
    await expectMonstellerBSA({}, undefined);
    await expectMonstellerBSA({ weight }, undefined);
    await expectMonstellerBSA({ height }, undefined);
    await expectMonstellerBSA({ weight: 0, height }, undefined);
    await expectMonstellerBSA({ weight, height: 0 }, undefined);
    await expectMonstellerBSA({ weight, height }, 1.9);
  });
});

async function expectBMI(root: unknown, value: unknown) {
  expect(await bmi.render({ ...options, root, value: undefined })).toHaveProperty("value", value);
}

async function expectDuboisBSA(root: unknown, value: unknown) {
  expect(await bsaDubois.render({ ...options, root, value: undefined })).toHaveProperty(
    "value",
    value,
  );
}

async function expectMonstellerBSA(root: unknown, value: unknown) {
  expect(await bsaMonsteller.render({ ...options, root, value: undefined })).toHaveProperty(
    "value",
    value,
  );
}
