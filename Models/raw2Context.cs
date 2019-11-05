using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace stackl.Models
{
    public partial class raw2Context : DbContext
    {
        public raw2Context()
        {
        }

        public raw2Context(DbContextOptions<raw2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<CommentsUniversal> CommentsUniversal { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Marking> Marking { get; set; }
        public virtual DbSet<Ndtwi> Ndtwi { get; set; }
        public virtual DbSet<Ndwi> Ndwi { get; set; }
        public virtual DbSet<Ntwi> Ntwi { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<PostLink> PostLink { get; set; }
        public virtual DbSet<PostTag> PostTag { get; set; }
        public virtual DbSet<PostsUniversal> PostsUniversal { get; set; }
        public virtual DbSet<SearchEntry> SearchEntry { get; set; }
        public virtual DbSet<StacklUser> StacklUser { get; set; }
        public virtual DbSet<Stopwords> Stopwords { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<Terms> Terms { get; set; }
        public virtual DbSet<Words> Words { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>(entity =>
            {
                entity.ToTable("author");

                entity.Property(e => e.AuthorId)
                    .HasColumnName("author_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.CreationDate)
                    .HasColumnName("creation_date")
                    .HasColumnType("timestamp(6) without time zone");

                entity.Property(e => e.LocationId).HasColumnName("location_id");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.Author)
                    .HasForeignKey(d => d.LocationId)
                    .HasConstraintName("author_location_id_fkey");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comment");

                entity.Property(e => e.CommentId)
                    .HasColumnName("comment_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.AuthorId).HasColumnName("author_id");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("created_date")
                    .HasColumnType("timestamp(6) without time zone");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.Property(e => e.Text).HasColumnName("text");

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.AuthorId)
                    .HasConstraintName("comment_author_id_fkey");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.PostId)
                    .HasConstraintName("comment_post_id_fkey");
            });

            modelBuilder.Entity<CommentsUniversal>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("comments_universal");

                entity.Property(e => e.Authorage).HasColumnName("authorage");

                entity.Property(e => e.Authorcreationdate).HasColumnName("authorcreationdate");

                entity.Property(e => e.Authordisplayname).HasColumnName("authordisplayname");

                entity.Property(e => e.Authorid).HasColumnName("authorid");

                entity.Property(e => e.Authorlocation).HasColumnName("authorlocation");

                entity.Property(e => e.Commentcreatedate).HasColumnName("commentcreatedate");

                entity.Property(e => e.Commentid).HasColumnName("commentid");

                entity.Property(e => e.Commentscore).HasColumnName("commentscore");

                entity.Property(e => e.Commenttext).HasColumnName("commenttext");

                entity.Property(e => e.Postid).HasColumnName("postid");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("location");

                entity.HasIndex(e => e.Text)
                    .HasName("location_text_key")
                    .IsUnique();

                entity.Property(e => e.LocationId).HasColumnName("location_id");

                entity.Property(e => e.Text).HasColumnName("text");
            });

            modelBuilder.Entity<Marking>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RowId, e.TableName })
                    .HasName("marking_pkey");

                entity.ToTable("marking");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.RowId).HasColumnName("row_id");

                entity.Property(e => e.TableName)
                    .HasColumnName("table_name")
                    .HasMaxLength(50);

                entity.Property(e => e.CreationDate)
                    .HasColumnName("creation_date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Note)
                    .HasColumnName("note")
                    .HasMaxLength(500);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Marking)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("marking_user_id_fkey");
            });

            modelBuilder.Entity<Ndtwi>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.Term })
                    .HasName("ndtwi_pkey");

                entity.ToTable("ndtwi");

                entity.HasIndex(e => e.PostId)
                    .HasName("post2_idx");

                entity.HasIndex(e => e.Term)
                    .HasName("term2_idx");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.Term)
                    .HasColumnName("term")
                    .HasMaxLength(100);

                entity.Property(e => e.Rdt)
                    .HasColumnName("rdt")
                    .HasColumnType("numeric");

                entity.Property(e => e.TermCount).HasColumnName("term_count");

                entity.Property(e => e.Tf)
                    .HasColumnName("tf")
                    .HasColumnType("numeric");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Ndtwi)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ndtwi_post_id_fkey");
            });

            modelBuilder.Entity<Ndwi>(entity =>
            {
                entity.HasKey(e => e.PostId)
                    .HasName("ndwi_pkey");

                entity.ToTable("ndwi");

                entity.HasIndex(e => e.PostId)
                    .HasName("post1_idx");

                entity.Property(e => e.PostId)
                    .HasColumnName("post_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.TermCount).HasColumnName("term_count");

                entity.HasOne(d => d.Post)
                    .WithOne(p => p.Ndwi)
                    .HasForeignKey<Ndwi>(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("ndwi_post_id_fkey");
            });

            modelBuilder.Entity<Ntwi>(entity =>
            {
                entity.HasKey(e => e.Term)
                    .HasName("ntwi_pkey");

                entity.ToTable("ntwi");

                entity.HasIndex(e => e.Term)
                    .HasName("term1_idx");

                entity.Property(e => e.Term).HasColumnName("term");

                entity.Property(e => e.TermCount).HasColumnName("term_count");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("post");

                entity.Property(e => e.PostId)
                    .HasColumnName("post_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.AcceptedAnswerId).HasColumnName("accepted_answer_id");

                entity.Property(e => e.AuthorId).HasColumnName("author_id");

                entity.Property(e => e.Body).HasColumnName("body");

                entity.Property(e => e.ClosedDate)
                    .HasColumnName("closed_date")
                    .HasColumnType("timestamp(6) without time zone");

                entity.Property(e => e.CreationDate)
                    .HasColumnName("creation_date")
                    .HasColumnType("timestamp(6) without time zone");

                entity.Property(e => e.ParentId).HasColumnName("parent_id");

                entity.Property(e => e.PostTypeId).HasColumnName("post_type_id");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.Property(e => e.Title).HasColumnName("title");

                entity.HasOne(d => d.AcceptedAnswer)
                    .WithMany(p => p.InverseAcceptedAnswer)
                    .HasForeignKey(d => d.AcceptedAnswerId)
                    .HasConstraintName("post_accepted_answer_id_fkey");

                entity.HasOne(d => d.Author)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.AuthorId)
                    .HasConstraintName("post_author_id_fkey");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("post_parent_id_fkey");
            });

            modelBuilder.Entity<PostLink>(entity =>
            {
                entity.HasKey(e => new { e.FromPostId, e.ToPostId })
                    .HasName("post_link_pkey");

                entity.ToTable("post_link");

                entity.Property(e => e.FromPostId).HasColumnName("from_post_id");

                entity.Property(e => e.ToPostId).HasColumnName("to_post_id");

                entity.HasOne(d => d.FromPost)
                    .WithMany(p => p.PostLinkFromPost)
                    .HasForeignKey(d => d.FromPostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("post_link_from_post_id_fkey");

                entity.HasOne(d => d.ToPost)
                    .WithMany(p => p.PostLinkToPost)
                    .HasForeignKey(d => d.ToPostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("post_link_to_post_id_fkey");
            });

            modelBuilder.Entity<PostTag>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.TagId })
                    .HasName("post_tag_pkey");

                entity.ToTable("post_tag");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.TagId).HasColumnName("tag_id");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostTag)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("post_tag_post_id_fkey");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.PostTag)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("post_tag_tag_id_fkey");
            });

            modelBuilder.Entity<PostsUniversal>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("posts_universal");

                entity.Property(e => e.Acceptedanswerid).HasColumnName("acceptedanswerid");

                entity.Property(e => e.Body).HasColumnName("body");

                entity.Property(e => e.Closeddate).HasColumnName("closeddate");

                entity.Property(e => e.Creationdate).HasColumnName("creationdate");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Linkpostid).HasColumnName("linkpostid");

                entity.Property(e => e.Ownerage).HasColumnName("ownerage");

                entity.Property(e => e.Ownercreationdate).HasColumnName("ownercreationdate");

                entity.Property(e => e.Ownerdisplayname).HasColumnName("ownerdisplayname");

                entity.Property(e => e.Ownerid).HasColumnName("ownerid");

                entity.Property(e => e.Ownerlocation).HasColumnName("ownerlocation");

                entity.Property(e => e.Parentid).HasColumnName("parentid");

                entity.Property(e => e.Posttypeid).HasColumnName("posttypeid");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.Property(e => e.Tags).HasColumnName("tags");

                entity.Property(e => e.Title).HasColumnName("title");
            });

            modelBuilder.Entity<SearchEntry>(entity =>
            {
                entity.ToTable("search_entry");

                entity.Property(e => e.SearchEntryId).HasColumnName("search_entry_id");

                entity.Property(e => e.CreationDate)
                    .HasColumnName("creation_date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Query)
                    .HasColumnName("query")
                    .HasMaxLength(100);

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SearchEntry)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("search_entry_user_id_fkey");
            });

            modelBuilder.Entity<StacklUser>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("stackl_user_pkey");

                entity.ToTable("stackl_user");

                entity.HasIndex(e => e.Username)
                    .HasName("stackl_user_username_key")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.CreationDate)
                    .HasColumnName("creation_date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasMaxLength(100);

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(25);
            });

            modelBuilder.Entity<Stopwords>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("stopwords");

                entity.HasIndex(e => e.Word)
                    .HasName("stopwords_word");

                entity.Property(e => e.Word)
                    .HasColumnName("word")
                    .HasMaxLength(18)
                    .HasDefaultValueSql("NULL::character varying");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("tag");

                entity.HasIndex(e => e.Text)
                    .HasName("tag_text_key")
                    .IsUnique();

                entity.Property(e => e.TagId).HasColumnName("tag_id");

                entity.Property(e => e.Text).HasColumnName("text");
            });

            modelBuilder.Entity<Terms>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.Term })
                    .HasName("terms_pkey");

                entity.ToTable("terms");

                entity.HasIndex(e => e.PostId)
                    .HasName("post_idx");

                entity.HasIndex(e => e.Term)
                    .HasName("term_idx");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.Term).HasColumnName("term");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Terms)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("terms_post_id_fkey");
            });

            modelBuilder.Entity<Words>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("words");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Idx).HasColumnName("idx");

                entity.Property(e => e.Lemma)
                    .HasColumnName("lemma")
                    .HasMaxLength(100);

                entity.Property(e => e.Pos)
                    .HasColumnName("pos")
                    .HasMaxLength(100);

                entity.Property(e => e.Sen).HasColumnName("sen");

                entity.Property(e => e.Tablename)
                    .HasColumnName("tablename")
                    .HasMaxLength(100);

                entity.Property(e => e.What)
                    .HasColumnName("what")
                    .HasMaxLength(100);

                entity.Property(e => e.Word)
                    .HasColumnName("word")
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
