import { Group, Inflection } from "../../types";
import { getCombiningForm, getPotentialForm, inflect } from "../conjugator";

describe("getCombiningForm", () => {
  test("it should return the ichidan form", () => {
    expect(getCombiningForm("食べる", Group.Ichidan)).toBe("食べ");
  });

  test("it should return the godan form", () => {
    expect(getCombiningForm("飲む", Group.Godan)).toBe("飲み");
  });

  test("it should return the する form", () => {
    expect(getCombiningForm("勉強する", Group.Irregular)).toBe("勉強し");
  });

  test("it should return the 来る form", () => {
    expect(getCombiningForm("来る", Group.Irregular)).toBe("来");
  });
});

describe("getPotentialForm", () => {
  test("it should return the ichidan form", () => {
    expect(getPotentialForm("食べる", Group.Ichidan)).toBe("食べられる");
  });

  test("it should return the godan form", () => {
    expect(getPotentialForm("飲む", Group.Godan)).toBe("飲める");
  });

  test("it should return 出来る for する", () => {
    expect(getPotentialForm("結婚する", Group.Irregular)).toBe("結婚できる");
  });

  test("it should return 来られる for 来る", () => {
    expect(getPotentialForm("くる", Group.Irregular)).toBe("来られる");
  });
});

describe("inflect", () => {
  test("it should return the non-past form", () => {
    expect(
      inflect(
        {
          slug: "上げる",
          group: Group.Ichidan,
        },
        Inflection.NonPast
      )
    ).toBe("上げる");
  });

  test("it should return the non-past polite form", () => {
    expect(
      inflect({ slug: "探す", group: Group.Godan }, Inflection.NonPastPolite)
    ).toBe("探します");
  });

  test("it should return the past polite form", () => {
    expect(
      inflect({ slug: "曲がる", group: Group.Godan }, Inflection.PastPolite)
    ).toBe("曲がりました");
  });
});
