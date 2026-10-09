import { ExternalLink, Languages, MessageSquare, Play, UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { sessionLabels, type SessionGroup } from '../data/sessions';
import type { Locale } from '../i18n/config';

export function SessionList({ groups, locale }: { groups: SessionGroup[]; locale: Locale }) {
	const labels = sessionLabels[locale];
	const languages = new Intl.DisplayNames([locale], { type: 'language' });
	function languageName(code: string) {
		try { return languages.of(code) || code; } catch { return code; }
	}
	return <div className="space-y-12">
		{groups.map((group) => <section key={group.id} aria-labelledby={`session-type-${group.id}`}>
			<h2 id={`session-type-${group.id}`} className="mb-5 font-heading text-2xl font-bold tracking-tight sm:text-3xl">{group.name}</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{group.sessions.map((session) => <Card key={session.code} className="transition-colors hover:border-primary/60">
					<CardHeader>
						<CardTitle><h3 className="text-xl leading-snug tracking-tight break-keep">{session.title}</h3></CardTitle>
						<p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground"><UserRound aria-hidden="true" className="mt-0.5 size-4 shrink-0" />{session.speakers.join(', ') || labels.unknownSpeaker}</p>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-2">
						{session.track && <Badge variant="secondary">{session.track}</Badge>}
						{session.language && <Badge variant="outline"><Languages aria-hidden="true" className="size-3" />{languageName(session.language)}</Badge>}
					</CardContent>
					<CardFooter className="flex flex-wrap gap-2">
						<Button asChild variant="outline"><a href={session.url} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" />{labels.details}</a></Button>
						<Button asChild><a href={`${session.url}feedback/`} target="_blank" rel="noopener noreferrer"><MessageSquare aria-hidden="true" />{labels.feedback}</a></Button>
						{session.video && <Button asChild variant="secondary"><a href={session.video} target="_blank" rel="noopener noreferrer"><Play aria-hidden="true" />{labels.video}</a></Button>}
					</CardFooter>
				</Card>)}
			</div>
		</section>)}
	</div>;
}
