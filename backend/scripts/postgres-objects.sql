create table positions
(
	id smallserial not null,
	name varchar(3) not null,
	zone smallint not null,
	maximumPlayers smallint,
	constraint "pk_public.positions" PRIMARY KEY(id),
	constraint "unq_public.positions_name" UNIQUE(name)
);

create table players
(
	id bigserial not null,
	name varchar(100) not null,
	level smallint not null,
	position varchar(2), -- change to fk positions
	constraint "pk_public.players" PRIMARY KEY(id)
)

--CONSTRAINT "fk_stock.stockitems_sales.products_id" FOREIGN KEY(productid) REFERENCES sales.products (id),
--CONSTRAINT "unq_stock.stockitems_aisle_bay_level_bin" UNIQUE (aisle, bay, level, bin)