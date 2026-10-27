import {
  basicPaths as basicPathsZh,
  type BasicPath,
} from "../basic-path-data";
import {
  courseDisplayOrder,
  courseNavigationOrder,
  courseModules as courseModulesZh,
  recommendedCourseOrder,
  stages as stagesZh,
  type CourseModule,
} from "../course-data";
import { keywordEntries as keywordEntriesZh } from "../keywords/keyword-data";
import { basicPathsEn } from "./basic-path-data.en";
import { courseModulesEn, stagesEn } from "./course-data.en";
import { keywordEntriesEn } from "./keyword-data.en";
import { isPathAvailable, type Locale } from "./locales";

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
  const localizedModules = locale === "zh" ? courseModulesZh : courseModulesEn;
  const moduleBySlug = new Map(
    localizedModules.map((courseModule) => [courseModule.slug, courseModule]),
  );
  const courseModules = courseDisplayOrder.map((slug) => {
    const courseModule = moduleBySlug.get(slug);
    if (!courseModule) throw new Error(`Missing localized course module: ${slug}`);
    return courseModule;
  });
  const stages = locale === "zh" ? stagesZh : stagesEn;
  const recommendedCourseModules = recommendedCourseOrder.map((slug) => {
    const courseModule = moduleBySlug.get(slug);
    if (!courseModule) throw new Error(`Missing localized mainline module: ${slug}`);
    return courseModule;
  });
  const courseStats = {
    stations: courseModules.length,
    checkpoints: courseModules.reduce(
      (total, courseModule) => total + courseModule.lessons,
      0,
    ),
    mainlineStations: recommendedCourseModules.length,
    prerequisiteStations: courseModules.filter(
      (courseModule) => courseModule.prerequisite,
    ).length,
    optionalReviewStations:
      courseModules.filter((courseModule) => courseModule.optionalReview).length,
    optionalExtensionStations: courseModules.filter(
      (courseModule) => courseModule.optionalExtension,
    ).length,
  };

  return { courseModules, stages, recommendedCourseModules, courseStats };
}

export function getCourseModule(locale: Locale, slug: string) {
  return getCourseCatalog(locale).courseModules.find(
    (courseModule) => courseModule.slug === slug,
  );
}

export function getAdjacentCourseModules(locale: Locale, slug: string) {
  const catalog = getCourseCatalog(locale);
  const current = catalog.courseModules.find(
    (courseModule) => courseModule.slug === slug,
  );
  if (current?.optionalReview) {
    return {
      previous: getCourseModule(locale, "beam-mental-model"),
      next: getCourseModule(locale, "processes-and-mailboxes"),
    };
  }
  if (current?.slug === "shared-semantics") {
    return {
      previous: getCourseModule(locale, "distributed-operations"),
      next: getCourseModule(locale, "interoperability"),
    };
  }
  if (current?.slug === "interoperability") {
    return {
      previous: getCourseModule(locale, "shared-semantics"),
      next: getCourseModule(locale, "reliable-scheduler"),
    };
  }

  const moduleBySlug = new Map(
    catalog.courseModules.map((courseModule) => [courseModule.slug, courseModule]),
  );
  const modules = courseNavigationOrder
    .map((item) => moduleBySlug.get(item))
    .filter((item): item is CourseModule => Boolean(item));
  const index = modules.findIndex((courseModule) => courseModule.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? modules[index - 1] : undefined,
    next: index < modules.length - 1 ? modules[index + 1] : undefined,
  };
}

export function getKeywordEntries(locale: Locale) {
  return locale === "zh" ? keywordEntriesZh : keywordEntriesEn;
}

export function assertCatalogParity() {
  const courseShape = (items: CourseModule[]) =>
    items.map((item) => ({
      slug: item.slug,
      number: item.number,
      stage: item.stage,
      prerequisite: Boolean(item.prerequisite),
      optionalReview: Boolean(item.optionalReview),
      optionalExtension: Boolean(item.optionalExtension),
    }));
  const catalogs = {
    courses: [courseShape(courseModulesZh), courseShape(courseModulesEn)] as const,
    stages: [
      stagesZh.map((stage) => stage.id),
      stagesEn.map((stage) => stage.id),
    ] as const,
    basics: [
      basicPathsZh.map((path) => ({
        id: path.id,
        lessons: path.lessons
          .filter((lesson) => isPathAvailable("en", `/from-scratch/${path.id}/${lesson.slug}`))
          .map((lesson) => lesson.slug),
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
        `The Chinese and English ${label} catalogs must keep the same route structure.`,
      );
    }
  }

  return catalogs;
}

assertCatalogParity();
