import {
  basicPaths as basicPathsZh,
  type BasicPath,
} from "../basic-path-data";
import {
  courseModules as courseModulesZh,
  stages as stagesZh,
  type CourseModule,
} from "../course-data";
import { keywordEntries as keywordEntriesZh } from "../keywords/keyword-data";
import { basicPathsEn } from "./basic-path-data.en";
import { courseModulesEn, stagesEn } from "./course-data.en";
import { keywordEntriesEn } from "./keyword-data.en";
import type { Locale } from "./locales";

export function getBasicPaths(locale: Locale) {
  return locale === "zh" ? basicPathsZh : basicPathsEn;
}

export function getBasicPath(locale: Locale, id: string) {
  return getBasicPaths(locale).find((path) => path.id === id);
}

export function getBasicLesson(path: BasicPath, slug: string) {
  return path.lessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentBasicLessons(path: BasicPath, slug: string) {
  const index = path.lessons.findIndex((lesson) => lesson.slug === slug);
  return {
    previous: index > 0 ? path.lessons[index - 1] : undefined,
    next:
      index >= 0 && index < path.lessons.length - 1
        ? path.lessons[index + 1]
        : undefined,
  };
}

export function getBasicPathStats(locale: Locale) {
  const paths = getBasicPaths(locale);
  return {
    paths: paths.length,
    lessons: paths.reduce((total, path) => total + path.lessons.length, 0),
  };
}

export function getCourseCatalog(locale: Locale) {
  const courseModules = locale === "zh" ? courseModulesZh : courseModulesEn;
  const stages = locale === "zh" ? stagesZh : stagesEn;
  const recommendedCourseModules = courseModules.filter(
    (courseModule) => !courseModule.optionalReview,
  );
  const courseStats = {
    stations: courseModules.length,
    checkpoints: courseModules.reduce(
      (total, courseModule) => total + courseModule.lessons,
      0,
    ),
    mainlineStations: recommendedCourseModules.length,
    optionalReviewStations:
      courseModules.length - recommendedCourseModules.length,
  };

  return { courseModules, stages, recommendedCourseModules, courseStats };
}

export function getCourseModule(locale: Locale, slug: string) {
  return getCourseCatalog(locale).courseModules.find(
    (courseModule) => courseModule.slug === slug,
  );
}

export function getAdjacentCourseModules(locale: Locale, slug: string) {
  const modules = getCourseCatalog(locale).courseModules;
  const index = modules.findIndex((courseModule) => courseModule.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };

  return {
    previous: modules
      .slice(0, index)
      .reverse()
      .find((courseModule) => !courseModule.optionalReview),
    next: modules
      .slice(index + 1)
      .find((courseModule) => !courseModule.optionalReview),
  };
}

export function getKeywordEntries(locale: Locale) {
  return locale === "zh" ? keywordEntriesZh : keywordEntriesEn;
}

export function assertCatalogParity() {
  const slugs = (items: CourseModule[]) => items.map((item) => item.slug);
  const catalogs = {
    courses: [slugs(courseModulesZh), slugs(courseModulesEn)] as const,
    stages: [
      stagesZh.map((stage) => stage.id),
      stagesEn.map((stage) => stage.id),
    ] as const,
    basics: [
      basicPathsZh.map((path) => ({
        id: path.id,
        lessons: path.lessons.map((lesson) => lesson.slug),
      })),
      basicPathsEn.map((path) => ({
        id: path.id,
        lessons: path.lessons.map((lesson) => lesson.slug),
      })),
    ] as const,
    keywords: [
      keywordEntriesZh.map((entry) => `${entry.language}:${entry.scope}:${entry.term}`),
      keywordEntriesEn.map((entry) => `${entry.language}:${entry.scope}:${entry.term}`),
    ] as const,
  };

  for (const [label, [chinese, english]] of Object.entries(catalogs)) {
    if (JSON.stringify(chinese) !== JSON.stringify(english)) {
      throw new Error(
        `The Chinese and English ${label} catalogs must keep the same route keys.`,
      );
    }
  }

  return catalogs;
}

assertCatalogParity();
