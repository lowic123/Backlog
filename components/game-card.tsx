import Image from "next/image";
import Link from "next/link";
import type { RawgGame } from "@/lib/rawg";

export default function GameCard({ game }: { game: RawgGame }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="block bg-[var(--surface-1)] border-[0.5px] border-[var(--border)] rounded-xl overflow-hidden no-underline transition-colors duration-150"
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--surface-0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              fontSize: "13px",
            }}
          >
            No image
          </div>
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <p style={{
          margin: 0,
          fontWeight: 500,
          fontSize: "14px",
          color: "var(--text-primary)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {game.name}
        </p>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "6px",
        }}>
          {game.rating > 0 && (
            <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              ★ {game.rating.toFixed(1)}
            </span>
          )}
          {game.released && (
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {game.released.slice(0, 4)}
            </span>
          )}
        </div>
        {game.genres.length > 0 && (
          <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
            {game.genres.slice(0, 2).map((g) => (
              <span
                key={g.id}
                style={{
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: "var(--surface-0)",
                  color: "var(--text-secondary)",
                  border: "0.5px solid var(--border)",
                }}
              >
                {g.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}