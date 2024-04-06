import { Group, Inflection, Verb } from "../types";
import { EndingVowel, toE, toI } from "./vowel-changer";

/**
Affirmative 	Negative
Non-past 	食べる 	食べない
Non-past, polite 	食べます 	食べません
Past 	食べた 	食べなかった
Past, polite 	食べました 	食べませんでした
Te-form 	食べて 	食べなくて
Potential 	食べられる 	食べられない
Passive 	食べられる 	食べられない
Causative 	食べさせる 	食べさせない
Causative Passive 	食べさせられる 	食べさせられない
Imperative 	食べろ 	食べるな
*/

/**
 * to get the verb stem we must check if it is an irregular verb
 * if it is reuturn the exception
 * if it is not we must check if it is a godan or ichidan verb
 * if it is a godan verb we must remove the last character and add the correct character
 *
 * @param verb string - the set of characters that makes up the verb
 * @param group Group - the group that the verb belongs to, e.g. ichidan
 * @returns
 */
export function getCombiningForm(verb: string, group: Group): string {
  switch (group) {
    // 食べる→食べ
    case Group.Ichidan:
      return verb.slice(0, -1);
    // 飲む→飲み
    case Group.Godan:
      return `${verb.slice(0, -1)}${toI(verb.slice(-1))}`;
    // する→し、来る→来、勉強する→勉強します
    case Group.Irregular:
      return verb.slice(-2) === "する" ? `${verb.slice(0, -2)}し` : "来";
    default:
      throw new Error("could not return combining for unknown character group");
  }
}

export function getPotentialForm(verb: string, group: Group) {
  switch (group) {
    // 描ける→描けれる
    case Group.Ichidan:
      return `${verb.slice(0, -1)}られる`;
    // 使う→使える
    case Group.Godan:
      return `${verb.slice(0, -1)}${toE(verb.slice(-1))}る`;
    // 勉強する→勉強出来る、来る→来られる
    case Group.Irregular:
      return verb.slice(-2) == `する`
        ? `${verb.slice(0, -2)}できる`
        : `来られる`;
  }
}

export function inflect(verb: Verb, inflection: Inflection): string {
  switch (inflection) {
    // 食べる
    case "non-past":
      return verb.slug;
    // 食べます
    case "non-past-polite":
      return `${getCombiningForm(verb.slug, verb.group)}ます`;
    // 食べた
    case "past":
      return "";
    // 食べました
    case "past-polite":
      return `${getCombiningForm(verb.slug, verb.group)}ました`;
    // 食べて
    case "te":
      return "";
    // 食べれる
    case "potential":
      return getPotentialForm(verb.slug, verb.group);
    // 食べられる
    case "passive":
      return "";
    case "imperative":
      return "";
    case "causative":
      return "";
    case "causative-passive":
      return "";
  }
}
