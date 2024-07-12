create table players
(
	id bigserial not null,
	name varchar(100) not null,
	level smallint not null,
	position varchar(2),
	constraint "pk_public.players" PRIMARY KEY (id)
)

--CONSTRAINT "fk_stock.stockitems_sales.products_id" FOREIGN KEY(productid) REFERENCES sales.products (id),
--CONSTRAINT "unq_stock.stockitems_aisle_bay_level_bin" UNIQUE (aisle, bay, level, bin)