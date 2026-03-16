import React from "react";
import Blog from "../components/Blog";

const BlogPage: React.FC = () => {
	return (
		<main className="pt-24">
			<section className="bg-slate-900 py-24 text-center">
				<div className="container mx-auto px-6">
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Health Insights</h1>
					<p className="text-xl text-slate-400 max-w-2xl mx-auto">
						Stay updated with the latest medical trends, wellness tips, and clinic news.
					</p>
				</div>
			</section>

			<Blog />

			<section className="py-24 bg-white">
				<div className="container mx-auto px-6 text-center">
					<button
						type="button"
						className="bg-mano-primary text-white px-8 py-4 rounded-full font-bold hover:bg-mano-accent transition-colors shadow-xl"
					>
						Load More Articles
					</button>
				</div>
			</section>
		</main>
	);
};

export default BlogPage;
