import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogCloseButton,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { sponsorLevels, type Sponsor, type SponsorContent, type SponsorLevel } from '../data/sponsors';

interface Props {
	content: SponsorContent;
}

const tierStyles: Record<SponsorLevel, { container: string; image: string }> = {
	gold: {
		container: 'min-h-44 sm:min-h-52',
		image: 'max-h-28 max-w-64 sm:max-h-32 sm:max-w-80',
	},
	silver: {
		container: 'min-h-36 sm:min-h-40',
		image: 'max-h-20 max-w-52 sm:max-h-24 sm:max-w-60',
	},
	bronze: {
		container: 'min-h-28 sm:min-h-32',
		image: 'max-h-14 max-w-40 sm:max-h-16 sm:max-w-44',
	},
};

export function SponsorGallery({ content }: Props) {
	const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
	const hasSponsors = content.sponsors.length > 0;

	return (
		<>
			{hasSponsors ? (
				<div className="space-y-10">
					{sponsorLevels.map((level) => {
						const sponsors = content.sponsors.filter((sponsor) => sponsor.level === level);

						if (sponsors.length === 0) return null;

						return (
							<section key={level} aria-labelledby={`sponsors-${level}`}>
								<h3 id={`sponsors-${level}`} className="font-mono text-sm font-semibold tracking-[0.16em] uppercase text-muted-foreground">
									{content.levels[level]}
								</h3>
								<div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{sponsors.map((sponsor) => (
										<button
											key={sponsor.name}
											type="button"
											onClick={() => setSelectedSponsor(sponsor)}
											className={cn(
												'flex w-full items-center justify-center rounded-2xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
												tierStyles[level].container,
											)}
										>
											<img src={sponsor.logo} alt={sponsor.name} className={cn('h-auto w-auto object-contain', tierStyles[level].image)} />
										</button>
									))}
								</div>
							</section>
						);
					})}
				</div>
			) : (
				<p className="rounded-2xl border border-dashed bg-muted/40 px-6 py-10 text-center text-muted-foreground">{content.empty}</p>
			)}

			<Dialog open={selectedSponsor !== null} onOpenChange={(open) => !open && setSelectedSponsor(null)}>
				{selectedSponsor && (
					<DialogContent>
						<DialogCloseButton label={content.dialog.close} />
						<div className="flex min-h-40 items-center justify-center rounded-xl border bg-white p-6">
							<img src={selectedSponsor.logo} alt={selectedSponsor.name} className="max-h-28 max-w-full object-contain" />
						</div>
						<DialogHeader>
							<p className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">{content.levels[selectedSponsor.level]}</p>
							<DialogTitle>{selectedSponsor.name}</DialogTitle>
							<DialogDescription>{selectedSponsor.description}</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button asChild size="lg">
								<a href={selectedSponsor.website} target="_blank" rel="noreferrer">
									{content.dialog.website}
									<ExternalLink data-icon="inline-end" />
								</a>
							</Button>
						</DialogFooter>
					</DialogContent>
				)}
			</Dialog>
		</>
	);
}
