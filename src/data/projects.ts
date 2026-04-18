// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}
export const projectsData: Project[] = [
	{
		id: "folkroll",
		title: "Interactive Blog System",
		description:
			"A personal blog and knowledge management system built with Astro + Svelte, featuring MDX content, RSS, and advanced interactive UI components.",
		image: "",
		category: "web",
		techStack: ["Astro", "Svelte", "TypeScript", "MDX"],
		status: "in-progress",
		sourceCode: "https://github.com/kino14910/folkroll",
		visitUrl: "https://folkroll.vercel.app/",
		startDate: "2026-03-01",
		featured: true,
		tags: ["Blog", "Interactive", "Frontend"],
	},

	{
		id: "wild-oasis-client",
		title: "Wild Oasis Client",
		description:
			"A full-stack booking platform built with Next.js App Router and React Server Components, supporting authentication, i18n, and real-time booking logic.",
		image: "",
		category: "web",
		techStack: ["Next.js", "React", "NextAuth", "Supabase"],
		status: "completed",
		sourceCode: "https://github.com/kino14910/the-wild-oasis-client",
		visitUrl: "https://the-wild-oasis-client-kino.vercel.app/",
		startDate: "2026-03-01",
		endDate: "2026-03-16",
		featured: true,
		tags: ["Fullstack", "Booking", "SaaS"],
	},

	{
		id: "wild-oasis-admin",
		title: "Wild Oasis Admin",
		description:
			"A React-based admin dashboard for cabin management with Supabase backend, featuring booking workflows, dashboards, and optimized state management.",
		image: "",
		category: "web",
		techStack: ["React", "TypeScript", "Supabase", "React Query"],
		status: "completed",
		sourceCode: "https://github.com/kino14910/the-wild-oasis",
		visitUrl: "https://the-wild-oasis-kino.vercel.app/",
		startDate: "2025-11-01",
		endDate: "2026-01-01",
		tags: ["Admin", "Dashboard", "Data"],
	},

	{
		id: "warehouse-next",
		title: "Warehouse System (Next.js)",
		description:
			"A warehouse management system rebuilt with Next.js + Node.js + MongoDB, covering inventory, orders, and customer management.",
		image: "",
		category: "web",
		techStack: ["Next.js", "Node.js", "MongoDB", "MUI"],
		status: "completed",
		startDate: "2023-09-01",
		endDate: "2023-12-01",
		tags: ["Fullstack", "Management", "CRUD"],
	},

	{
		id: "music-player",
		title: "Desktop Music Player",
		description:
			"A cross-platform desktop music player built with Tauri + SvelteKit, exploring IPC communication and lightweight native integration.",
		image: "",
		category: "desktop",
		techStack: ["Tauri", "SvelteKit", "Rust", "TypeScript"],
		status: "in-progress",
		startDate: "2026-01-01",
		featured: true,
		tags: ["Desktop", "Tauri", "Media"],
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
