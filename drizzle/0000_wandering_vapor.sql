CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`featured_image` text,
	`category` text NOT NULL,
	`tags` text,
	`seo_title` text,
	`seo_description` text,
	`published` integer DEFAULT false,
	`published_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `email_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`lead_magnet` text,
	`subscribed` integer DEFAULT true,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_leads_email_unique` ON `email_leads` (`email`);--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`plan_type` text NOT NULL,
	`status` text NOT NULL,
	`started_at` text NOT NULL,
	`expires_at` text,
	`stripe_subscription_id` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` text,
	`affiliate_link` text NOT NULL,
	`image_url` text,
	`category` text NOT NULL,
	`pet_type` text NOT NULL,
	`featured` integer DEFAULT false,
	`rating` integer,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `routines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pet_type` text NOT NULL,
	`apartment_size` text NOT NULL,
	`morning_routine` text,
	`afternoon_routine` text,
	`evening_routine` text,
	`exercise_tips` text,
	`feeding_schedule` text,
	`created_at` text NOT NULL
);
