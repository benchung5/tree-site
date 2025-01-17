<?php

use Lib\Model;
use Lib\Utils;

class Articles_model extends Model
{
	public $options;

	public function __construct() {
		parent::__construct();
	}

	public function get($opts = [])
	{
		$this->db->table('articles a')->select('*');

		if (isset($opts['id'])) {
			$this->db->where('a.id', '=', $opts['id']);
		}

		if (isset($opts['slug'])) {
			$this->db->where('a.slug', '=', $opts['slug']);
		}

		if (isset($opts['category'])) {
			// _category_slug and _category_id are not to be used in the result
			// they're only named so they don't overwrite the article id and slug in this same query
			$this->db->innerJoin('article_categories ac', 'a.id', 'ac.article_id');
			$this->db->innerJoin('categories c', 'c.id', 'ac.category_id');
			$this->db->select('a.*, c.slug AS _category_slug, c.id AS _category_id');
			$this->db->where('c.slug', '=' , $opts['category']);
		}

		$result = $this->db->get();

		if ($result) {
			// // get images
			// $result->images = $this->db->table('files')
			// 	->select('id, name, description')
			// 	->where('ref_id', $result->id)
			// 	// ->orderBy('sort_order, name')
			// 	->getAll();

			// get images
			$result->images = Json_decode($result->images) ?: [] ;
			foreach ($result->images as $image) {
				if(property_exists($image, 'tag')) {
					$image->tag_name = $this->db->table('tags_files_articles t')
						->select('*')
						->where('id', $image->tag)
						->get()->name;
				}
			}

			// get categories
			$result->categories = $this->db->table('categories c')
				->innerJoin('article_categories ac', 'ac.category_id', 'c.id')
				->select('c.id, c.slug, c.name')
				->where('ac.article_id', $result->id)
				->getAll();

			// // get tags
			// $result->tags = $this->db->table('article_tags at')
			// 	->select('t.id, t.name')
			// 	->where('article_id', $result->id)
			// 	->innerJoin('tags t', 't.id', 'at.tag_id')
			// 	->getAll();
			
			return $result;
		}

		return false;
	}

		public function get_all($opts = [], $isCount = false) 
	{
		$this->db->table('articles a');

		// only return ones in a certain mode
		if (isset($opts['mode'])) {
			if ($opts['mode']) {
				$this->db->where('a.mode_id', '=', $opts['mode']);
			} else {
				return [];
			}
		}

		// use search criteria
		if (isset($opts['like'])) {
			foreach (explode(',', $opts['like']) AS $search_term) {
				$this->db->grouped(function($q, $search_term) {
					$q->like('a.name', '%'.$search_term.'%')
					->orLike('a.slug', '%'.$search_term.'%');
				}, $search_term);
			}
		}

		//categories
		if (isset($opts['categories'])) {
			if (count($opts['categories']) > 0) {
				$this->db
					->innerJoin('article_categories at', 'at.article_id', 'a.id')
					->innerJoin('categories t', 't.id', 'at.category_id')
					->in('t.id', $opts['categories']);
			} else {
				// force no results since category is queried but no category is selected
				return [];
			}
		}


		if ($isCount) {
			 $this->db->select('DISTINCT a.id');

			 $result = $this->db->getAll();

			return count($result);
		} else {

			//select
			if (isset($opts['select'])) {
				$this->db->select(implode(',', $opts['select']));
			} else {
				$this->db->select('a.id, a.slug, a.name');
			}

			//offset & limit
			if (isset($opts['offset'])) {
				$this->db->limit($opts['offset'], $opts['limit']);
			}

			//include images and categories
			$this->db
				// ->select('GROUP_CONCAT(DISTINCT f.name) AS featured_image')
				// ->select('GROUP_CONCAT(DISTINCT f.description) AS image_description')
				->select('a.images')
				->select('GROUP_CONCAT(DISTINCT c.slug) AS categories')
				// ->leftJoin('files f', 'f.id', 'a.featured_image')
				->leftJoin('article_categories ac', 'ac.article_id', 'a.id')
				->leftJoin('categories c', 'c.id', 'ac.category_id')
				->groupBy('a.id');

			$result = $this->db->orderBy('created_on')->getAll();

			foreach ($result AS $entry) {
				$entry->images = Json_decode($entry->images) ?: [] ;
			}

			return $result;
		}
	}

	public function count()
	{
		$result = $this->db->table('articles')->count('id', 'total_rows')->get();
		if ($result) {
			return (int)$result->total_rows;
		} 
		return false;
	}

	public function add($data, $joins_data)
	{
		if (is_array($data)) {
			$this->db->table('articles')->insert($data);
			$new_article_id = $this->db->insertId();

			//insert joins
			$this->insert_joins($new_article_id, $joins_data, 'categories', 'category_id', 'article_categories');
			// $this->insert_joins($new_article_id, $joins_data, 'tags', 'tag_id', 'article_tags');
			
			return $new_article_id;
		}

		return false;
	}

	protected function insert_joins($article_id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			$ids = (! is_array($joins[$table_name])) ? explode(',', $joins[$table_name]) : $joins[$table_name];

			foreach ($ids as $id) {
				$ins = ['article_id' => $article_id, $table_id_name => $id];
				$this->db->table($join_table_name)->insert($ins);
			}
		}
	}

	public function remove($opts = [])
	{
		if ($opts) {
			$this->db->table('articles');

			if (isset($opts['id'])) {
				$this->db->where('id', '=', $opts['id']);
			}

			if (isset($opts['slug'])) {
				$this->db->where('slug', '=', $opts['slug']);
			}

			$article = $this->db->get();

			$deleted_article_id = $article->id;

			$this->db->table('articles')->where('id', $deleted_article_id)->delete();

			// remove categories
			$this->db->table('article_categories')->where('article_id', $deleted_article_id)->delete();

			// remove tags
			// $this->db->table('article_tags')->where('article_id', $deleted_article_id)->delete();

			// remove files
			//$this->db->table('files')->where('ref_id', $deleted_article_id)->delete();

			return $deleted_article_id;
		}

		return false;
	}

	public function update($opts = []) 
	{

		$article_id = $this->db->table('articles')->where($opts['where'])->get()->id;

		if (isset($opts['where']) && isset($opts['update'])) {
			$this->db->table('articles');
			$this->db->where($opts['where'])->update($opts['update']);
		}

		// many to many tables
		if (isset($opts['joins'])) {
			$joins = $opts['joins'];

			$this->update_joins($article_id, $joins, 'categories', 'category_id', 'article_categories');
			// $this->update_joins($article_id, $joins, 'tags', 'tag_id', 'article_tags');

		}
	}

	protected function update_joins($id, $joins, $table_name, $table_id_name, $join_table_name) {
		if (isset($joins[$table_name])) {
			// clear existing associations
			$this->db->table($join_table_name)->where('article_id', $id)->delete();

			// insert new associations
			$associatons = is_array($joins[$table_name]) ? $joins[$table_name] : explode(',', $joins[$table_name]);
			foreach ($associatons as $associaton_id) {
				$this->db->table($join_table_name)->insert(['article_id' => $id, $table_id_name => $associaton_id]);
			}
		}
	}
}